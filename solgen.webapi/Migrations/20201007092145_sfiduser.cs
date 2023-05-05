using Microsoft.EntityFrameworkCore.Migrations;

namespace Solgen.WebApi.Migrations
{
    public partial class sfiduser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SFID",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SFID",
                table: "AspNetUsers");
        }
    }
}
