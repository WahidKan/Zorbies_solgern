using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Solgen.WebApi.Migrations
{
    public partial class timezoneentry : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AboutMe",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BadgeText",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CountryCode",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedById",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DefaultGroupNotificationFrequency",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DelegatedApproverId",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EmailEncodingKey",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "EmailPreferencesAutoBcc",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "EmailPreferencesAutoBccStayInTouch",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "EmailPreferencesStayInTouchReminder",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FederationIdentifier",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GeocodeAccuracy",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsExtIndicatorVisible",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsProfilePhotoActive",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LanguageLocaleKey",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastModifiedById",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModifiedDate",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastPasswordChangeDate",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastReferencedDate",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastViewedDate",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LocaleSidKey",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OutOfOfficeMessage",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ReceivesAdminInfoEmails",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ReceivesInfoEmails",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SFAccountId",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SFBannerPhotoUrl",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SFCallCenterId",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SFContactId",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SFDigestFrequency",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SFExternal_ID__c",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SFFullPhotoUrl",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SFIndividualId",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "SFIsActive",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SFManagerId",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SFMediumBannerPhotoUrl",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SFMediumPhotoUrl",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SFMy_Team_Name__c",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SFProfileId",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SFService_Territory_PL__c",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SFService_Territory__c",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SFSmallBannerPhotoUrl",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SFSmallPhotoUrl",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SFTeam_Lead__c",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Sales_Text__c",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SenderEmail",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SenderName",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Signature",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StateCode",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StayInTouchNote",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StayInTouchSignature",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StayInTouchSubject",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "SystemModstamp",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "TimeZone",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TimeZoneSidKey",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UManagerId",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "dsfs__DSProSFUsername__c",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AboutMe",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "BadgeText",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "CountryCode",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "DefaultGroupNotificationFrequency",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "DelegatedApproverId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "EmailEncodingKey",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "EmailPreferencesAutoBcc",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "EmailPreferencesAutoBccStayInTouch",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "EmailPreferencesStayInTouchReminder",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "FederationIdentifier",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "GeocodeAccuracy",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "IsExtIndicatorVisible",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "IsProfilePhotoActive",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "LanguageLocaleKey",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "LastModifiedById",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "LastModifiedDate",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "LastPasswordChangeDate",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "LastReferencedDate",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "LastViewedDate",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "LocaleSidKey",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "OutOfOfficeMessage",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ReceivesAdminInfoEmails",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ReceivesInfoEmails",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SFAccountId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SFBannerPhotoUrl",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SFCallCenterId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SFContactId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SFDigestFrequency",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SFExternal_ID__c",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SFFullPhotoUrl",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SFIndividualId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SFIsActive",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SFManagerId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SFMediumBannerPhotoUrl",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SFMediumPhotoUrl",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SFMy_Team_Name__c",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SFProfileId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SFService_Territory_PL__c",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SFService_Territory__c",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SFSmallBannerPhotoUrl",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SFSmallPhotoUrl",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SFTeam_Lead__c",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Sales_Text__c",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SenderEmail",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SenderName",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Signature",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "StateCode",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "StayInTouchNote",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "StayInTouchSignature",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "StayInTouchSubject",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SystemModstamp",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "TimeZone",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "TimeZoneSidKey",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "UManagerId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "dsfs__DSProSFUsername__c",
                table: "AspNetUsers");
        }
    }
}
