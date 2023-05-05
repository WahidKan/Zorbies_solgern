using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Solgen.WebApi.Migrations
{
    public partial class Initial1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Webbrowser",
                table: "AspNetUsers",
                maxLength: 8000,
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "BrowserVersion",
                table: "AspNetUsers",
                maxLength: 8000,
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "AssignedBankId",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AssignedBankId",
                table: "AspNetUsers");

            migrationBuilder.AlterColumn<string>(
                name: "Webbrowser",
                table: "AspNetUsers",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 8000,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "BrowserVersion",
                table: "AspNetUsers",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 8000,
                oldNullable: true);
        }
    }
}
