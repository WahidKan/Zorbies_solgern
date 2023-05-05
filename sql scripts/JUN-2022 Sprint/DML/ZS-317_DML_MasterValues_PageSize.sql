   
BEGIN
   IF NOT EXISTS (
               SELECT mst.MasterNameId,MasterValue ,MasterKey ,IsFrontEnd,1000 
			   FROM tblMasters items                              
               INNER JOIN tblMasterNames mst ON mst.MasterNameId=items.MasterNameId 
               WHERE mst.MasterNameTitle='PageSize' AND items.companyid=1000
			     )
   BEGIN
       INSERT INTO tblMasters
	   (
	     MasterNameId ,
		 MasterValue ,
		 MasterKey ,
		 IsFrontEnd,
		 CompanyID
	    )
   SELECT mst.MasterNameId,MasterValue ,MasterKey ,IsFrontEnd,1000 
   FROM tblMasters items                              
   INNER JOIN tblMasterNames mst ON mst.MasterNameId=items.MasterNameId 
   WHERE mst.MasterNameTitle='PageSize' AND items.companyid=1003
   END
END

   