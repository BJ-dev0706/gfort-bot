# Gfort Bot 🤖

A powerful Discord bot designed specifically for tech agency servers, providing professional tools for team management, project tracking, and client communication.

## ✨ Features

- 👥 **Team Management**
  - Role-based access control
  - Team member onboarding
  - Department organization
  - Staff availability tracking

- 📊 **Project Management**
  - Project status tracking
  - Task assignment and deadlines
  - Client project channels
  - Progress reporting

- 💼 **Client Management**
  - Client onboarding system
  - Support ticket management
  - Client communication channels
  - Service request handling

- 🔧 **Development Tools**
  - GitHub integration
  - Code review notifications
  - Deployment status updates
  - Development environment management

- 📈 **Analytics & Reporting**
  - Team performance metrics
  - Project timeline tracking
  - Client satisfaction monitoring
  - Resource utilization reports

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   https://github.com/BJ-dev0706/gfort-bot.git
   cd gfort-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   DISCORD_TOKEN=your_bot_token_here
   GITHUB_TOKEN=your_github_token
   DATABASE_URL=your_database_url
   ADMIN_ROLE_ID=your_admin_role_id
   ```

4. **Get your Discord bot token**
   - Visit [Discord Developer Portal](https://discord.com/developers/applications)
   - Create a new application
   - Navigate to the "Bot" section
   - Click "Add Bot"
   - Copy your token

5. **Configure bot intents**
   In the Discord Developer Portal, enable:
   - SERVER MEMBERS INTENT
   - MESSAGE CONTENT INTENT
   - GUILD_MESSAGES
   - GUILD_MEMBERS

6. **Invite the bot to your server**
   - Go to OAuth2 > URL Generator
   - Select "bot" scope
   - Choose required permissions:
     - Administrator (recommended for full functionality)
     - Or select specific permissions:
       - Manage Roles
       - Manage Channels
       - Send Messages
       - Embed Links
       - Attach Files
       - Read Message History
   - Use the generated URL to invite the bot

7. **Start the bot**
   ```bash
   npm start
   ```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DISCORD_TOKEN` | Your Discord bot token | Yes |
| `GITHUB_TOKEN` | GitHub API token for integration | Yes |
| `DATABASE_URL` | Database connection string | Yes |
| `ADMIN_ROLE_ID` | Role ID for bot administrators | Yes |

### Customization

You can customize the bot's behavior by modifying the configuration files in the `src/config` directory:
- `roles.json`: Role management settings
- `channels.json`: Channel configuration
- `commands.json`: Command settings
- `permissions.json`: Permission levels

## 🛠️ Development

### Prerequisites

- Node.js 16.x or higher
- npm or yarn
- MongoDB or PostgreSQL
- GitHub account (for integration)

### Development Mode

Run the bot with auto-reload for development:
```bash
npm run dev
```

### Building

Build the project:
```bash
npm run build
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you need help or have questions:
- Open an issue on GitHub
- Join our [Discord server](https://discord.gg/QFXzuhTvQy)

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by the Discord.js community
- Built with ❤️ for tech agencies 