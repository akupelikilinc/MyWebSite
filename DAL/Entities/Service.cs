namespace MyWebsite.DAL.Entities
{
    public class Service
    {
        public int ServiceId { get; set; }
        public string ServiceName { get; set; }

        public string Description { get; set; }
        public string Icon { get; set; }

        public int OrderNo { get; set; }
        public bool IsActive { get; set; }
    }
}
