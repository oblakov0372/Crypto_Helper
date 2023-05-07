using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class CryptoTracker4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PortfolioTokens_Portfolios_PordfolioId",
                table: "PortfolioTokens");

            migrationBuilder.RenameColumn(
                name: "PordfolioId",
                table: "PortfolioTokens",
                newName: "PortfolioId");

            migrationBuilder.RenameIndex(
                name: "IX_PortfolioTokens_PordfolioId",
                table: "PortfolioTokens",
                newName: "IX_PortfolioTokens_PortfolioId");

            migrationBuilder.AddForeignKey(
                name: "FK_PortfolioTokens_Portfolios_PortfolioId",
                table: "PortfolioTokens",
                column: "PortfolioId",
                principalTable: "Portfolios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PortfolioTokens_Portfolios_PortfolioId",
                table: "PortfolioTokens");

            migrationBuilder.RenameColumn(
                name: "PortfolioId",
                table: "PortfolioTokens",
                newName: "PordfolioId");

            migrationBuilder.RenameIndex(
                name: "IX_PortfolioTokens_PortfolioId",
                table: "PortfolioTokens",
                newName: "IX_PortfolioTokens_PordfolioId");

            migrationBuilder.AddForeignKey(
                name: "FK_PortfolioTokens_Portfolios_PordfolioId",
                table: "PortfolioTokens",
                column: "PordfolioId",
                principalTable: "Portfolios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
