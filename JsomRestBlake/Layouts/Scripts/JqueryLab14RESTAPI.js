            //Create student site
            $(document).ready(function () {
                $("#btn_createSubSite").click(function () {
                    alert("Creating Student Site");
                    try {
                        $(document).ready(function () {

                            var siteurl = _spPageContextInfo.webAbsoluteUrl;
                            var urlUser = siteurl + "/_api/web/webinfos/add";

                            var studentStringFirstName = $("#student_First_Name").val();
                            var studentStringLastName = $("#student_Last_Name").val();
                            var studentSiteCollectionUrl = studentStringFirstName[0].toUpperCase() + studentStringLastName.substring(0, 1).toUpperCase() + studentStringLastName.substring(1).toLowerCase();
                            var studentSiteTitle = studentStringFirstName.substring(0, 1).toUpperCase() + studentStringFirstName.substring(1).toLowerCase() + " " + studentStringLastName.substring(0, 1).toUpperCase() + studentStringLastName.substring(1).toLowerCase();
                            var rootSiteUrl = "http://hogwarts/sites/students";
                            var siteUrl = rootSiteUrl + "/" + studentSiteCollectionUrl;

                            $.ajax({
                                url: urlUser,
                                type: "POST",
                                data: JSON.stringify(
                                    {
                                        'parameters': {
                                            '__metadata': { 'type': 'SP.WebInfoCreationInformation' },
                                            'Url': studentSiteCollectionUrl,
                                            'Title': studentSiteTitle,
                                            'Description': studentSiteTitle + "'s student site!",
                                            'Language': 1033,
                                            'WebTemplate': 'sts',
                                            'UseUniquePermissions': false
                                        }
                                    }
                                ),
                                headers: {
                                    "accept": "application/json; odata=verbose",
                                    "content-type": "application/json;odata=verbose",
                                    "content-length": 1000,
                                    "X-RequestDigest": $("#__REQUESTDIGEST").val()
                                },
                                success: onsuccess,
                                error: onerror
                            });

                        });

                    }
                    catch (ex) {
                        alert(ex);
                    }

                    function onsuccess(data) {
                        alert("Student site created!");
                        createList();
                    }

                    function onerror(errorMessage) {
                        alert(JSON.stringify(errorMessage));
                    }

                });
            });

            function createList() {
                var siteUrl = _spPageContextInfo.webAbsoluteUrl;
                var listName = "Assignments1";
                var studentStringFirstName = $("#student_First_Name").val();
                var studentStringLastName = $("#student_Last_Name").val();
                var studentSiteCollectionUrl = studentStringFirstName[0].toUpperCase() + studentStringLastName.substring(0, 1).toUpperCase() + studentStringLastName.substring(1).toLowerCase();
                var studentSiteTitle = studentStringFirstName.substring(0, 1).toUpperCase() + studentStringFirstName.substring(1).toLowerCase() + " " + studentStringLastName.substring(0, 1).toUpperCase() + studentStringLastName.substring(1).toLowerCase();
                var rootSiteUrl = "http://hogwarts/sites/students";
                var studentSiteUrl = rootSiteUrl + "/" + studentSiteCollectionUrl;
                var fullUrl = siteUrl + "/" + studentSiteCollectionUrl + "/_api/web/lists";

                $.ajax({
                    url: fullUrl,
                    type: "POST",
                    data: JSON.stringify({
                        '__metadata': { 'type': 'SP.List' },
                        'BaseTemplate': 101,
                        'Title': listName
                    }),
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-type": "application/json;odata=verbose",
                        "X-RequestDigest": $("#__REQUESTDIGEST").val()
                    },
                    success: onQuerySucceeded,
                    error: onQueryFailed
                });


                function onQuerySucceeded(data) {
                    alert("Assignment document library successfully created!");
                    createSubmittedSiteColumn();

                }

                function onQueryFailed() {
                    alert('Error!');
                }

            }

            //Create Submitted site column
            function createSubmittedSiteColumn() {

                var studentStringFirstName = $("#student_First_Name").val();
                var studentStringLastName = $("#student_Last_Name").val();
                var studentSiteCollectionUrl = studentStringFirstName[0].toUpperCase() + studentStringLastName.substring(0, 1).toUpperCase() + studentStringLastName.substring(1).toLowerCase();
                var folderName = "Submitted1";


                var siteUrl = _spPageContextInfo.webAbsoluteUrl;

                var fullUrl = siteUrl + "/" + studentSiteCollectionUrl + "/_api/web/lists/GetByTitle('Assignments1')/Fields";

                $.ajax({

                    url: fullUrl,

                    type: "POST",

                    data: "{ '__metadata': { 'type': 'SP.Field' }, 'Title':'" + folderName + "', 'FieldTypeKind': 4 , 'Group': 'Student Site Columns' }",


                    headers: {

                        "accept": "application/json;odata=verbose",

                        "content-type": "application/json;odata=verbose",

                        "X-RequestDigest": $("#__REQUESTDIGEST").val()

                    },

                    success: onQuerySucceeded1,

                    error: onQueryFailed1

                });

            }

            function onQuerySucceeded1() {

                alert("Submitted Column Created Successfully!");
                createGradeSiteColumn();

            }

            function onQueryFailed1() {

                alert('Error!');

            }


            //Create Grade site column
            function createGradeSiteColumn() {

                var studentStringFirstName = $("#student_First_Name").val();
                var studentStringLastName = $("#student_Last_Name").val();
                var studentSiteCollectionUrl = studentStringFirstName[0].toUpperCase() + studentStringLastName.substring(0, 1).toUpperCase() + studentStringLastName.substring(1).toLowerCase();
                var folderName2 = "Grade1";


                var siteUrl = _spPageContextInfo.webAbsoluteUrl;

                var fullUrl = siteUrl + "/" + studentSiteCollectionUrl + "/_api/web/lists/GetByTitle('Assignments1')/Fields";

                $.ajax({

                    url: fullUrl,

                    type: "POST",

                    data: "{ '__metadata': { 'type': 'SP.FieldNumber' }, 'Title':'" + folderName2 + "', 'FieldTypeKind': 9 , 'Group': 'Student Site Columns', 'MinimumValue': 0, 'MaximumValue': 100}",
                    //data: "{ '__metadata': { 'type': 'SP.FieldNumber' }, 'FieldTypeKind': 9, 'Title':'" + folderName2 + "', 'Minimum Value': 0 , 'Maximum Value': 100 }",

                    headers: {

                        "accept": "application/json;odata=verbose",

                        "content-type": "application/json;odata=verbose",

                        "X-RequestDigest": $("#__REQUESTDIGEST").val()

                    },

                    success: onQuerySucceeded2,

                    error: onQueryFailed2

                });

            }

            function onQuerySucceeded2() {


                alert("Grade Column Created Successfully!");
                studentSiteCreatedMsg2();

            }

            function onQueryFailed2() {

                alert('Error!');

            }



            function studentSiteCreatedMsg2() {


                var studentStringFirstName = $("#student_First_Name").val();
                var studentStringLastName = $("#student_Last_Name").val();
                var studentSiteCollectionUrl = studentStringFirstName[0].toUpperCase() + studentStringLastName.substring(0, 1).toUpperCase() + studentStringLastName.substring(1).toLowerCase();
                var studentSiteTitle = studentStringFirstName.substring(0, 1).toUpperCase() + studentStringFirstName.substring(1).toLowerCase() + " " + studentStringLastName.substring(0, 1).toUpperCase() + studentStringLastName.substring(1).toLowerCase();


                document.getElementById("siteCreated2").innerHTML = "Site has been successfully created at " + studentSiteTitle + " using REST API!";
            }