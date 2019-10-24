using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatRoomChallenge.Entities
{
    public class User
    {
        private string userName;

        private string id;

        public string UserName { get => userName; set => userName = value; }

        public string Id { get => id; set => id = value; }
    }
}
