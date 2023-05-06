using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class CryptoTracker2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Trasnactions_Portfolios_PordfolioId",
                table: "Trasnactions");

            migrationBuilder.RenameColumn(
                name: "PordfolioId",
                table: "Trasnactions",
                newName: "PortfolioId");

            migrationBuilder.RenameIndex(
                name: "IX_Trasnactions_PordfolioId",
                table: "Trasnactions",
                newName: "IX_Trasnactions_PortfolioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Trasnactions_Portfolios_PortfolioId",
                table: "Trasnactions",
                column: "PortfolioId",
                principalTable: "Portfolios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Trasnactions_Portfolios_PortfolioId",
                table: "Trasnactions");

            migrationBuilder.RenameColumn(
                name: "PortfolioId",
                table: "Trasnactions",
                newName: "PordfolioId");

            migrationBuilder.RenameIndex(
                name: "IX_Trasnactions_PortfolioId",
                table: "Trasnactions",
                newName: "IX_Trasnactions_PordfolioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Trasnactions_Portfolios_PordfolioId",
                table: "Trasnactions",
                column: "PordfolioId",
                principalTable: "Portfolios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
