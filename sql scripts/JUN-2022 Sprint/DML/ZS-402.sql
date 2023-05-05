--select * from tblMasters where CustomFieldID=129 AND IsFrontEnd= 1 AND MasterNameId='B26CD862-ED77-43B5-994A-CBED655E622E'
--select * from tblMasterNames where  MasterNameValue='Status'
if not exists(select * from tblMasters where ModuleID=4
		and SubModuleID = 6 and MAsterkey='InActive' and CustomFieldID=129 )
BEGIN
	INSERT INTO tblMasters (MasterId,MAsterkey,MasterValue,masterStatusId
				,MasterIsDeleted,IsFrontEnd,MasterDescription,MasterUniqueNum
				,ModuleID,SubModuleID, CustomFieldID,IsRoleApply,OnlyForManageUser)
	VALUES (NEWID(),'InActive','In Active','D69986C3-F743-46C1-BE0A-6F397D1AB931',0,
				1, '', NULL, 4,6,
				129, 0 , 0)
END
UPDATE tblMasters
SET IsFrontEnd= 0,
	MasterIsDeleted=1
WHERE MasterId='4ED3C7FE-A891-433F-A578-4AF96C8F5807'

UPDATE tblMasters
SET IsFrontEnd= 0,
	MasterIsDeleted=1
WHERE MasterId='EAC215C0-A71B-4BD1-9368-52DA0F0CF8CE'

UPDATE tblMasters
SET IsFrontEnd= 0,
	MasterIsDeleted=1
WHERE MasterId='8A99EA97-89F1-4CE0-B29C-6B4A9F5C8EA4'



