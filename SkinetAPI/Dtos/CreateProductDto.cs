using System.ComponentModel.DataAnnotations;

namespace SkinetAPI.Dtos
{
    public class CreateProductDto
    {
        [Required]
        public  string Name { get; set; }=string.Empty;
        [Required]
        public  string Description { get; set; }
        [Range(0.01,double.MaxValue,ErrorMessage ="Price must be a positive value")]
        public decimal Price { get; set; }
        [Required]
        public string PictureUrl { get; set; }=string.Empty;
        [Required]
        public  string Type { get; set; }
        [Required]  
        public  string Brand { get; set; }
        [Range(0, int.MaxValue, ErrorMessage = "Quantity in stock must be a non-negative value")]
        public int QuantityInStock { get; set; }
    }
}
