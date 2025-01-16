using Domain.Models;
using Infrastruction.Enites;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastruction.Configurations
{
    public class BookConfiguration : IEntityTypeConfiguration<BookEntity>
    {
        public void Configure(EntityTypeBuilder<BookEntity> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(b=>b.Title).IsRequired();

            builder.Property(b=>b.Author).IsRequired();

            builder.Property(b=>b.Price).IsRequired();

            builder.Property(b => b.Cart).IsRequired();
        }
    }
}
