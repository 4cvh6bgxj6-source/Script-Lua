
import { Script } from './types';

export const MOCK_SCRIPTS: Script[] = [
  {
    id: '1',
    title: 'Universal Auto-Farm v4.2',
    game: 'Blox Fruits',
    description: 'High-speed level farming with automated quest completion and auto-stat allocation.',
    author: 'DeltaMaster',
    code: `-- DeltaScript Blox Fruits Auto-Farm
getgenv().AutoFarm = true
getgenv().SelectWeapon = "Melee"

loadstring(game:HttpGet("https://raw.githubusercontent.com/Example/Main/BloxFruits.lua"))()`,
    stars: 1250,
    downloads: 45000,
    tags: ['AutoFarm', 'Combat', 'Quest'],
    lastUpdated: '2 hours ago',
    thumbnail: 'https://picsum.photos/seed/blox/400/225'
  },
  {
    id: '2',
    title: 'Sniper & Aim Elite',
    game: 'FPS / Universal',
    description: 'Advanced sniper prediction and hitbox adjustment for extreme long-range precision.',
    author: 'GhostCode',
    code: `-- Delta Sniper Elite v2
local SniperSettings = {
    Prediction = true,
    Smoothness = 0.5,
    TargetPart = "Head"
}
print("Sniper Script Initialized")`,
    stars: 3100,
    downloads: 92000,
    tags: ['Sniper', 'Aim', 'FPS'],
    lastUpdated: 'Just now',
    thumbnail: 'https://picsum.photos/seed/sniper/400/225'
  },
  {
    id: '3',
    title: 'Brainrot Instant Steal (Premium)',
    game: 'Brainrot Games',
    description: 'Instant item theft and currency collection for brainrot-themed simulators. Premium bypass included.',
    author: 'RichDev',
    code: `-- Brainrot Instant Steal v1.0
getgenv().InstantSteal = true
getgenv().AutoCollect = true
warn("Instant Steal Activated - Premium Edition")`,
    stars: 4500,
    downloads: 150000,
    tags: ['Premium', 'Steal', 'Instant'],
    lastUpdated: '1 hour ago',
    thumbnail: 'https://picsum.photos/seed/steal/400/225'
  },
  {
    id: '4',
    title: 'Infinite Jump & Fly',
    game: 'Universal',
    description: 'Basic movement script that works on almost every game engine. Simple and safe.',
    author: 'ScriptKitty',
    code: `-- Universal Movement
game:GetService("UserInputService").JumpRequest:Connect(function()
    game.Players.LocalPlayer.Character:FindFirstChildOfClass("Humanoid"):ChangeState("Jumping")
end)`,
    stars: 5400,
    downloads: 250000,
    tags: ['Movement', 'Universal', 'Simple'],
    lastUpdated: '5 days ago',
    thumbnail: 'https://picsum.photos/seed/universal/400/225'
  }
];
