namespace BookStore.Contracts
{
    public record BooksResponse(Guid Id, string Title, string Author, decimal Price, bool Cart);
}
