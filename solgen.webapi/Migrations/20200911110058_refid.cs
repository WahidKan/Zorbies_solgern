using Microsoft.EntityFrameworkCore.Migrations;

namespace Solgen.WebApi.Migrations
{
    public partial class refid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ManageId",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "ManagerId",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "RefID",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ManagerId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "RefID",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "ManageId",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
