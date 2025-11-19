using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyWebSite.Admin.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddIdentityTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { 1, "2b78c250-2ef5-4cc8-bdee-2704963d17be", "Admin", "ADMIN" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "EmailConfirmed", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "SecurityStamp" },
                values: new object[] { "167d0641-2009-419c-8dba-982b4760edb0", true, "ADMİN@EXAMPLE.COM", "ADMİN", "AQAAAAIAAYagAAAAEIsQWkasUz6NkooWFSgdblFcotZZKE5fwqBySCRPGZFf1T9gKtUhoYWXpQpHM7av6g==", "0dcc957a-516a-43e7-ac6d-78691dfc0551" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { 1, 1 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "EmailConfirmed", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "SecurityStamp" },
                values: new object[] { "342f45f2-6568-48a1-bd0c-8c4e4447ff16", false, null, null, "$2a$11$vb9a3YKQQchUYj/o/Dqyz.eiauMk22v9.dYQFNLd0cyfbtBEac6Te", null });
        }
    }
}
