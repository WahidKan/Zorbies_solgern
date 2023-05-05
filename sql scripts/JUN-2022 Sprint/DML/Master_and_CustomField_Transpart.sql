--module to be shifted 
DROP TABLE IF EXISTS #tempModules;
SELECT
    *
INTO
    #tempModules
FROM
    [Solgenone_stage].[dbo].tblModuless ff
WHERE
    ff.module_name_code NOT IN
        (
            SELECT
                module_name_code
            FROM
                [Zolar_Stage].[dbo].tblModuless gg
            WHERE
                gg.status_id = 1001
        );


--sub module to be shifted 
DROP TABLE IF EXISTS #tempSubModules;
SELECT
        ff.*,
        MM.module_name_code AS moduleCode
INTO
        #tempSubModules
FROM
        [Solgenone_stage].[dbo].tblSubModules ff
    INNER JOIN
        [Solgenone_stage].[dbo].tblModuless   MM
            ON MM.module_id = ff.module_id
WHERE
        ff.module_name_code NOT IN
            (
                SELECT
                    module_name_code
                FROM
                    [Zolar_Stage].[dbo].tblSubModules gg
                WHERE
                    gg.status_id = 1001
            )
        AND ff.status_id = 1001;


--get custom field and groups
DROP TABLE IF EXISTS #tempcustomFields;
SELECT
    *
INTO
    #tempcustomFields
FROM
    (
        SELECT
                sss.module_name_code,
                gg.group_name,
                ddd.*
        FROM
                [Solgenone_stage].[dbo].tblcustom_field       ddd
            INNER JOIN
                [Solgenone_stage].[dbo].tblSubModules         sss
                    ON sss.sub_module_id = ddd.sub_module_id
            INNER JOIN
                [Solgenone_stage].[dbo].tblcustom_field_group gg
                    ON gg.group_id = ddd.group_id
        WHERE
                ddd.status_id <> 1003
                AND custom_field_id NOT IN
                        (
                            SELECT
                                    dd.custom_field_id
                            FROM
                                    (
                                        SELECT
                                                ss.module_name_code,
                                                zstf.*
                                        FROM
                                                [Zolar_Stage].[dbo].tblcustom_field zstf
                                            INNER JOIN
                                                [Zolar_Stage].[dbo].tblSubModules   ss
                                                    ON ss.sub_module_id = zstf.sub_module_id
                                    ) ff
                                INNER JOIN
                                    (
                                        SELECT
                                                ss.module_name_code,
                                                zstf.*
                                        FROM
                                                [Solgenone_stage].[dbo].tblcustom_field zstf
                                            INNER JOIN
                                                [Solgenone_stage].[dbo].tblSubModules   ss
                                                    ON ss.sub_module_id = zstf.sub_module_id
                                    ) dd
                                        ON dd.module_name_code = ff.module_name_code
                                           AND dd.name = ff.name
                        )
    ) tbl;



--SELECT * FROM #tempcustomFields
DROP TABLE IF EXISTS #tmpCustomFieldGroup;

SELECT  DISTINCT
        gg.group_name,
        gg.group_description,
        sm.module_name_code,
        gg.is_system_generated
INTO
        #tmpCustomFieldGroup
FROM
        [Solgenone_stage].[dbo].tblcustom_field       cf
    INNER JOIN
        [Solgenone_stage].[dbo].tblSubModules         sm
            ON sm.sub_module_id = cf.sub_module_id
    INNER JOIN
        [Solgenone_stage].[dbo].tblcustom_field_group gg
            ON gg.group_id = cf.group_id
WHERE
        gg.group_name NOT IN
            (
                SELECT
                        gg.group_name
                FROM(
                                        SELECT
                                                ss.module_name_code,
                                                zstf.*
                                        FROM
                                                [Zolar_Stage].[dbo].tblcustom_field zstf
                                            INNER JOIN
                                                [Zolar_Stage].[dbo].tblSubModules   ss
                                                    ON ss.sub_module_id = zstf.sub_module_id
                                    ) ff
                                INNER JOIN
                                    (
                                        SELECT
                                                ss.module_name_code,
                                                zstf.*
                                        FROM
                                                [Solgenone_stage].[dbo].tblcustom_field zstf
                                            INNER JOIN
                                                [Solgenone_stage].[dbo].tblSubModules   ss
                                                    ON ss.sub_module_id = zstf.sub_module_id
                                    ) dd

                                        ON dd.module_name_code = ff.module_name_code
                                           AND dd.name = ff.name
 INNER JOIN
        [Solgenone_stage].[dbo].tblcustom_field_group gg
            ON gg.group_id = dd.group_id
            )
        AND cf.status_id <> 1003;


--master values
DROP TABLE IF EXISTS #mastervalues;
SELECT
        nn.MasterNameTitle,
        ms.*
INTO
        #mastervalues
FROM
        [Solgenone_stage].[dbo].tblMasters     ms
    INNER JOIN
        [Solgenone_stage].[dbo].tblMasterNames nn
            ON nn.MasterNameId = ms.MasterNameId
WHERE
        ms.MasterNameId IN
            (
                SELECT
                    MasterNameId
                FROM
                    [Solgenone_stage].[dbo].tblMasterNames tmn
                WHERE
                    tmn.MasterNameValue NOT IN
                        (
                            SELECT
                                MasterNameValue
                            FROM
                                [Zolar_Stage].[dbo].tblMasterNames
                        )
            );


--Insert table MasterNames
INSERT INTO [Zolar_Stage].[dbo].[tblMasterNames]
    (
        [MasterNameId],
        [MasterNameValue]
    )
            SELECT
                NEWID(),
                MasterNameTitle
            FROM
                (
                    SELECT DISTINCT
                           MasterNameTitle
                    FROM
                           #mastervalues
                ) ff;



--insert master values
INSERT INTO [Zolar_Stage].[dbo].tblMasters
    (
        MasterNameId,
        MasterKey,
        MasterValue,
        MasterStatusId,
        IsFrontEnd
    )
            SELECT
                (
                    SELECT TOP 1
                           MasterNameId
                    FROM
                           [Zolar_Stage].[dbo].tblMasterNames
                    WHERE
                           MasterNameId = ff.MasterNameId
                ),
                ff.MasterKey,
                ff.MasterValue,
                ff.MasterStatusId,
                ff.IsFrontEnd
            FROM
                #mastervalues ff;

INSERT INTO [Zolar_Stage].[dbo].[tblModuless]
    (
        [module_name],
        [module_desc],
        [module_code],
        [module_css_class],
        [display_order],
        [module_name_code],
        [module_route],
        [created_on],
        [created_by],
        [modify_on],
        [modify_by],
        [status_id],
        [company_id],
        [is_default],
        [for_custom_form]
    )
            SELECT
                [module_name],
                [module_desc],
                [module_code],
                [module_css_class],
                [display_order],
                [module_name_code],
                [module_route],
                [created_on],
                [created_by],
                [modify_on],
                [modify_by],
                [status_id],
                [company_id],
                [is_default],
                [for_custom_form]
            FROM
                #tempModules;





INSERT INTO [Zolar_Stage].[dbo].[tblSubModules]
    (
        [module_id],
        [sub_module_name],
        [module_code],
        [module_css_class],
        [display_order],
        [module_name_code],
        [module_route],
        [created_on],
        [created_by],
        [modify_on],
        [modify_by],
        [status_id],
        [company_id],
        [for_rule_engine],
        [for_custom_form],
        [is_loan_application],
        [table_name],
        [is_used_in_cal],
        [global_module_css_class],
        [for_layout_form]
    )
            SELECT
                (
                    SELECT TOP 1
                           [module_id]
                    FROM
                           [Zolar_Stage].[dbo].[tblModuless] ss
                    WHERE
                           ss.module_name_code = ff.moduleCode
                ),
                ff.[sub_module_name],
                ff.[module_code],
                ff.[module_css_class],
                ff.[display_order],
                ff.[module_name_code],
                ff.[module_route],
                ff.[created_on],
                ff.[created_by],
                ff.[modify_on],
                ff.[modify_by],
                ff.[status_id],
                ff.[company_id],
                ff.[for_rule_engine],
                ff.[for_custom_form],
                ff.[is_loan_application],
                ff.[table_name],
                ff.[is_used_in_cal],
                ff.[global_module_css_class],
                ff.[for_layout_form]
            FROM
                #tempSubModules ff;


INSERT INTO [Zolar_Stage].[dbo].[tblcustom_field_group]
    (
        [group_name],
        [group_description],
        [is_system_generated],
        [status_id],
        [module_id],
        [sub_module_id]
    )
            SELECT
                    group_name,
                    group_description,
                    is_system_generated,
                    1001,
                    ss.module_id,
                    ss.sub_module_id
            FROM
                    #tmpCustomFieldGroup                gg
                INNER JOIN
                    [Zolar_Stage].[dbo].[tblSubModules] ss
                        ON ss.module_name_code = gg.module_name_code;
INSERT INTO [Zolar_Stage].[dbo].[tblcustom_field]
    (
        [module_id],
        [sub_module_id],
        [group_id],
        [company_id],
        [name],
        [description],
        [data_type_id],
        [actual_data_type],
        [form_field_visibility],
        [edit_form_field_visibility],
        [view_form_field_visibility],
        [view_top_row_form_field_visibility],
        [list_field_visibility],
        [length],
        [is_required],
        [is_system_generated],
        [validation_type],
        [range_from],
        [range_to],
        [regular_expression],
        [table_name],
        [table_alias],
        [picklist_options],
        [decimal_places],
        [dt_code],
        [created_date],
        [modify_date],
        [created_by],
        [modify_by],
        [display_name],
        [is_field_sortable],
        [dropdown_type],
        [field_code],
        [dependent_type],
        [parent_id],
        [email_template_column],
        [user_guide],
        [join_name],
        [enable_import],
        [field_order],
        [column_width],
        [status_id],
        [PrimaryTableColumn],
        [is_readOnly],
        [is_ForNotSave],
        [ref_table],
        [field_route],
        [dependent_on],
        [custom_ref],
        [field_route_list],
        [route_field_name],
        [IsColor],
        [automation_flow_visibility],
        [is_primary_column]
    )
            SELECT
                (
                    SELECT TOP 1
                           sb.module_id
                    FROM
                           [Zolar_Stage].[dbo].tblSubModules sb
                    WHERE
                           sb.module_name_code = tt.module_name_code
                ),
                (
                    SELECT TOP 1
                           sb.sub_module_id
                    FROM
                           [Zolar_Stage].[dbo].tblSubModules sb
                    WHERE
                           sb.module_name_code = tt.module_name_code
                ),
                (
                    SELECT  TOP 1
                            gg.group_id
                    FROM
                            [Zolar_Stage].[dbo].tblSubModules         sb
                        INNER JOIN
                            [Zolar_Stage].[dbo].tblcustom_field_group gg
                                ON gg.sub_module_id = sb.sub_module_id
                    WHERE
                            sb.module_name_code = tt.module_name_code
                            AND gg.group_name = tt.group_name
                ),
                [company_id],
                [name],
                [description],
                [data_type_id],
                [actual_data_type],
                [form_field_visibility],
                [edit_form_field_visibility],
                [view_form_field_visibility],
                [view_top_row_form_field_visibility],
                [list_field_visibility],
                [length],
                [is_required],
                [is_system_generated],
                [validation_type],
                [range_from],
                [range_to],
                [regular_expression],
                [table_name],
                [table_alias],
                [picklist_options],
                [decimal_places],
                [dt_code],
                [created_date],
                [modify_date],
                [created_by],
                [modify_by],
                [display_name],
                [is_field_sortable],
                [dropdown_type],
                [field_code],
                [dependent_type],
                [parent_id],
                [email_template_column],
                [user_guide],
                [join_name],
                [enable_import],
                [field_order],
                [column_width],
                [status_id],
                [PrimaryTableColumn],
                [is_readOnly],
                [is_ForNotSave],
                [ref_table],
                [field_route],
                [dependent_on],
                [custom_ref],
                [field_route_list],
                [route_field_name],
                [IsColor],
                [automation_flow_visibility],
                [is_primary_column]
            FROM
                #tempcustomFields tt;