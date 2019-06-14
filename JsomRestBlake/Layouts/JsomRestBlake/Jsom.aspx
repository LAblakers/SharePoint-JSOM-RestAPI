<%@ Assembly Name="$SharePoint.Project.AssemblyFullName$" %>
<%@ Import Namespace="Microsoft.SharePoint.ApplicationPages" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Jsom.aspx.cs" Inherits="JsomRestBlake.Layouts.JsomRestBlake.ApplicationPage1" DynamicMasterPageFile="~masterurl/default.master" %>

<asp:content id="PageHead" contentplaceholderid="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-3.3.1.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <script type="text/javascript" src="../Scripts/JqueryLAB14JSOM.js"></script>
    
</asp:content>

<asp:Content ID="Main" ContentPlaceHolderID="PlaceHolderMain" runat="server">
 

    <table style="width: 100%;">
        <tr>
           <td><h1>Create Student Site</h1></td> 
        </tr>
        <tr> <%--//Prompt for student name--%>           
            <td>First Name:   <input id="student_First_Name" type="text" /></td>            
        </tr>
        <tr>
            <td>Last Name:    <input id="student_Last_Name" type="text"/></td>           
        </tr>
        <tr>
                     
            <td> <button id="btnSubmit" type="button" onclick="createSubSite1()">Create Site</button></td>
        </tr>        
        <tr>
            <td><p id="siteCreated"></p></td>
        </tr>
    </table>    
</asp:Content>

<asp:Content ID="PageTitle" ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
Application Page
</asp:Content>

<asp:Content ID="PageTitleInTitleArea" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server" >
My Application Page
</asp:Content>
