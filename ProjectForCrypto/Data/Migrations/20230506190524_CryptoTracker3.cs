using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class CryptoTracker3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Trasnactions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "PortfolioTokens",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Trasnactions_UserId",
                table: "Trasnactions",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PortfolioTokens_UserId",
                table: "PortfolioTokens",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_PortfolioTokens_Users_UserId",
                table: "PortfolioTokens",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Trasnactions_Users_UserId",
                table: "Trasnactions",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PortfolioTokens_Users_UserId",
                table: "PortfolioTokens");

            migrationBuilder.DropForeignKey(
                name: "FK_Trasnactions_Users_UserId",
                table: "Trasnactions");

            migrationBuilder.DropIndex(
                name: "IX_Trasnactions_UserId",
                table: "Trasnactions");

            migrationBuilder.DropIndex(
                name: "IX_PortfolioTokens_UserId",
                table: "PortfolioTokens");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Trasnactions");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "PortfolioTokens");
        }
    }
}
