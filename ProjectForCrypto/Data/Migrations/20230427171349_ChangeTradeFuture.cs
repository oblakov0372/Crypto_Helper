using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class ChangeTradeFuture : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TakeProfitPercent",
                table: "Trades",
                newName: "Risk");

            migrationBuilder.RenameColumn(
                name: "StopLossPercent",
                table: "Trades",
                newName: "Reward");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Risk",
                table: "Trades",
                newName: "TakeProfitPercent");

            migrationBuilder.RenameColumn(
                name: "Reward",
                table: "Trades",
                newName: "StopLossPercent");
        }
    }
}
