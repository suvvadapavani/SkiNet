using SkinetCore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace SkinetInfrastructure.Data
{
    public class StoreContextSeed
    {
        //public static async Task SeedAsync(StoreContext context)
        //{
        //    if (!context.Products.Any())
        //    {
        //        var productsData=await File.ReadAllTextAsync("../SkinetInfrastructure/Data/SeedData/products.json");
        //        var products = JsonSerializer.Deserialize<List<Product>>(productsData);
        //        if (products != null)
        //        {
        //            return;
        //        }
        //        context.Products.AddRange(products);
        //        await context.SaveChangesAsync();
        //    }
        //}

        public static async Task SeedAsync(StoreContext context)
        {
            if (!context.Products.Any())
            {
                var path = Path.Combine(Directory.GetCurrentDirectory(), "..", "SkinetInfrastructure", "Data", "SeedData", "products.json");
                var productsData = await File.ReadAllTextAsync(path);

                var products = JsonSerializer.Deserialize<List<Product>>(productsData);

                if (products != null && products.Count > 0)
                {
                    context.Products.AddRange(products);
                    await context.SaveChangesAsync();
                }
            }
        }

    }
}
