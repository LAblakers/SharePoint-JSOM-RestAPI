

    function createSubSite1() {
            alert("Creating Subsite!");
            var studentStringFirstName = $("#student_First_Name").val();
            var studentStringLastName = $("#student_Last_Name").val();
            var studentSiteCollectionUrl = studentStringFirstName[0].toUpperCase() + studentStringLastName.substring(0, 1).toUpperCase() + studentStringLastName.substring(1).toLowerCase();
            var studentSiteTitle = studentStringFirstName.substring(0, 1).toUpperCase() + studentStringFirstName.substring(1).toLowerCase() + " " + studentStringLastName.substring(0, 1).toUpperCase() + studentStringLastName.substring(1).toLowerCase();
            var rootSiteUrl = "http://hogwarts/sites/students";
            var siteUrl = rootSiteUrl + "/" + studentSiteCollectionUrl;

            //#3.)The student site should be created
            var ctx = new SP.ClientContext(rootSiteUrl);
            var web = ctx.get_web();
            var webInfo = new SP.WebCreationInformation();
            webInfo.set_title(studentSiteTitle);
            webInfo.set_description(studentSiteTitle + "'s subsite was created using JavaScript Object Model");
            webInfo.set_url(studentSiteCollectionUrl);
            webInfo.set_webTemplate('STS#0');
            webInfo.set_useSamePermissionsAsParentSite(true);
            webInfo.set_language(1033);

            web.get_webs().add(webInfo);
            web.update();
            ctx.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded1), Function.createDelegate(this, this.onQueryFailed1));
    }

        function onQuerySucceeded1() {
            alert("Successfully created subsite!");
            createList();
        }

        function onQueryFailed1(sender, args) {
            alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
        }

        function createList() {
            //#4.) Create a Document library for each student
            var studentStringFirstName = $("#student_First_Name").val();
            var studentStringLastName = $("#student_Last_Name").val();
            var studentSiteCollectionUrl = studentStringFirstName[0].toUpperCase() + studentStringLastName.substring(0, 1).toUpperCase() + studentStringLastName.substring(1).toLowerCase();
            var rootSiteUrl = "http://hogwarts/sites/students";
            var siteUrl = rootSiteUrl + "/" + studentSiteCollectionUrl;

            var clientContext = new SP.ClientContext(siteUrl);
            var oWebsite = clientContext.get_web();

            var listCreationInfo = new SP.ListCreationInformation();
            listCreationInfo.set_title('Assignments');
            listCreationInfo.set_templateType(SP.ListTemplateType.documentLibrary);

            this.oList = oWebsite.get_lists().add(listCreationInfo);

            clientContext.load(oList);

            clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded2), Function.createDelegate(this, this.onQueryFailed2));


        }

                function onQuerySucceeded2() {
                    var result = oList.get_title() + ' created.';
                    alert(result + " document library created.");
                    addSiteColumns();
                }

                        function onQueryFailed2(sender, args) {
                        alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
                        }


        function addSiteColumns() {

            var studentStringFirstName = $("#student_First_Name").val();
            var studentStringLastName = $("#student_Last_Name").val();
            var studentSiteCollectionUrl = studentStringFirstName[0].toUpperCase() + studentStringLastName.substring(0, 1).toUpperCase() + studentStringLastName.substring(1).toLowerCase();
            var rootSiteUrl = "http://hogwarts/sites/students";
            var siteUrl = rootSiteUrl + "/" + studentSiteCollectionUrl;

            var clientContext = new SP.ClientContext(siteUrl);
            var oWebsite = clientContext.get_web();
            //Getting reference to the list
            oList = clientContext.get_web().get_lists().getByTitle('Assignments');

            // Get field collection
            var fldCollection = oList.get_fields();
            //Submitted Column
            var f1 = clientContext.castTo(
                        fldCollection.addFieldAsXml('<Field Type="DateTime" DisplayName="Submitted" Name="Submitted" Group="Student Site Columns" />', true,
                SP.AddFieldOptions.addToDefaultContentType),
                SP.FieldText);
            f1.set_title("Submitted");
            f1.update();
            ////Grade Column (the max value is set to 100 but it still shows 10,000 I dont know why)
            var f2 = clientContext.castTo(
                            oList.get_fields().addFieldAsXml('<Field Type="Number" Name="Grade" StaticName="Grade" DisplayName="Grade" Group="Student Site Columns" Min="0" Max="100" />', true,
                    SP.AddFieldOptions.addToDefaultContentType),
                SP.FieldText);
            f2.set_title("Grade");
            f2.update();

            clientContext.executeQueryAsync(
                Function.createDelegate(this, this.onQuerySucceeded3),
                Function.createDelegate(this, this.onQueryFailed3)
            );


        }

        function onQuerySucceeded3() {
            alert("Site columns Submitted & Grade successfully added to document library.");
            studentSiteCreatedMsg();

        }

        function onQueryFailed3(sender, args) {
        alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
        }

        function studentSiteCreatedMsg() {


            var studentStringFirstName = $("#student_First_Name").val();
            var studentStringLastName = $("#student_Last_Name").val();
            var studentSiteCollectionUrl = studentStringFirstName[0].toUpperCase() + studentStringLastName.substring(0, 1).toUpperCase() + studentStringLastName.substring(1).toLowerCase();
            var studentSiteTitle = studentStringFirstName.substring(0, 1).toUpperCase() + studentStringFirstName.substring(1).toLowerCase() + " " + studentStringLastName.substring(0, 1).toUpperCase() + studentStringLastName.substring(1).toLowerCase();


            document.getElementById("siteCreated").innerHTML = "Site has been successfully created at " + studentSiteTitle + " using JSOM.";

        }



    