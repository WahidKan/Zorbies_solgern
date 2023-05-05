using Microsoft.EntityFrameworkCore.Migrations;

namespace Solgen.WebApi.Migrations
{
    public partial class Initialcompany1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "CompanyID",
                table: "AspNetUsers",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "CompanyID",
                table: "AspNetUsers",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(long),
                oldNullable: true);
        }
    }
}
