using Microsoft.EntityFrameworkCore.Migrations;

namespace Solgen.WebApi.Migrations
{
    public partial class userreffrom : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RefFrom",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RefFrom",
                table: "AspNetUsers");
        }
    }
}
