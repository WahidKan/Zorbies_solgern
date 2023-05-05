using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Solgen.WebApi.Migrations
{
    public partial class InitialCol : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
              name: "ExecutiveCommisionFormula",
              table: "AspNetUsers",
              nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
              name: "ExecutiveCommisionFormula",
              table: "AspNetUsers");
        }
    }
}
