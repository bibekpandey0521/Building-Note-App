using Microsoft.EntityFrameworkCore;
using Notes.API.Models.Entities;

namespace Notes.API.Data
{
    public class NotesDBContext :DbContext //it will inherit from DbContext
    { 
        public NotesDBContext(DbContextOptions options) : base(options) //Constructor it options to base Class
        { 
            //
        }
        //Way 
        public  DbSet<Note> Notes { get; set; } //Notes Table 
    }
}
