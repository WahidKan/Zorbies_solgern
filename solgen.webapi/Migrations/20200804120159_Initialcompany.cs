using Microsoft.EntityFrameworkCore.Migrations;

namespace Solgen.WebApi.Migrations
{
    public partial class Initialcompany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "CompanyID",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompanyID",
                table: "AspNetUsers");
        }
    }
}
