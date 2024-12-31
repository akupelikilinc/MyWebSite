namespace MyWebsite.DAL.Entities
{
    public class Message
    {
        public int MessageId { get; set; }
        public string Name { get; set; }
        public string Mail { get; set; }
        public string MessageText { get; set; }
        public string Phone { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsRead { get; set; }
    }
}
