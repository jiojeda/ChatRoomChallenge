using ChatRoomChallenge.Entities;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatRoomChallenge.Hubs
{
    public class ChatHub : Hub
    {

        public static List<User> ConnectedUsers = new List<User>();

        public async void Connect(string userName)
        {
            User user = new User()
            {
                UserName = userName,
                Id = Context.ConnectionId
            };

            ConnectedUsers.Add(user);

            await Clients.All.SendAsync("UpdateUsers", ConnectedUsers.Count, ConnectedUsers.Select(u => u.UserName));
        }

        public async Task SendMessage(string message)
        {
            User user = ConnectedUsers.First(u => u.Id.Equals(Context.ConnectionId));

            await Clients.All.SendAsync("ReceiveMessage", user.UserName, message);
        }
    }
}
