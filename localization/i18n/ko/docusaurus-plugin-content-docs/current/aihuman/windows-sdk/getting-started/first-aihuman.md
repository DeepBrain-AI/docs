---
sidebar_position: 3
---

# 나의 AI Human 만들기

In this chapter, we will quickly set up AIPlayer with the default AI and learn about AI speaking process. When setting up AIPlayer for the first time, it may take several minutes to load depending on the network condition.

For your information, it is similar to the QuickStart part of the Sample, which can be downloaded from the SDK website.

<img src="/img/aihuman/windows/QuickStart_Main.png" />

:::tip
From the sample, you can learn more from the code in the file below.
- QuickStartView.xaml
- QuickStartViewModel.cs
:::

### 1. Add View Control
Add Layout Component(parent layout) to which AIPlayer will be added to MainWindow.xaml.

The view that makes AI Human work is called AIPlayerView.
Specify the location where you want the AI Human to appear, i.e. where you want the AIPlayerView to be placed.

<img src="/img/aihuman/windows/NewProject_Add_Layout.png"  />

<img src="/img/aihuman/windows/NewProject_Add_AIPlayer.png" />

### 2. Authenticate with AuthStart function
Write a code related to authentication at the time of application initialization by referring to the code below.

- App.xaml.cs

  First, you need to authenticate. The userKey can be issued by registering the appId on the AI Human SDK Website.

```csharp
using AIHuman.Core;
using Newtonsoft.Json;
using System.Windows;

namespace WpfApp1
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        public App()
        {
            AIAPI.Instance.AuthStart("your appId", "your userKey", "your uuid", "wnds",
                (aiLIst, error) =>
                {
                    if (string.IsNullOrEmpty(error) && aiLIst != null)
                    {
                        string jsonStr = aiLIst.Root.ToString();
                        AIAPI.AIList list = JsonConvert.DeserializeObject<AIAPI.AIList>(jsonStr);
                        // $"Auth Complete, Avaliable Count: {list.ai.Length}";
                    }
                    else
                    {
                        MessageBox.Show($"AuthStart: {error}");
                    }
                }
            );
        }
    }
}
```

### 3. Create AIPlayer Instance and Implement Callback

Read the code below to create an AIPlayer Instance and try to implement a callback related to AI Human state via IAIPlayerCallback inheritance.

- MainWindowViewModel.cs

```csharp
using AIHuman.Common;
using AIHuman.Common.Base;
using AIHuman.Core;
using AIHuman.Interface;
using AIHuman.Media;
using System;
using System.Collections.ObjectModel;
using System.Windows;
using System.Windows.Threading;

namespace WpfApp1
{
    public class MainWindowViewModel : ViewModelBase, IAIPlayerCallback
    {
        private AIPlayer _aiPlayer;
        public AIPlayerView AIPlayerObject
        {
            get => _aiPlayer.GetObject();
            private set => OnPropertyChanged(nameof(AIPlayerObject));
        }

        private string _status;
        public string AIStatusText
        {
            get => _status;
            set
            {
                _status = value;
                OnPropertyChanged(nameof(AIStatusText));
            }
        }

        private string _inputText;
        public string InputText
        {
            get => _inputText;
            set
            {
                _inputText = value;
                OnPropertyChanged(nameof(InputText));
            }
        }

        private ObservableCollection<string> _speechList;
        public ObservableCollection<string> SpeechList
        {
            get => _speechList;
            private set
            {
                _speechList = value;
                OnPropertyChanged(nameof(SpeechList));
            }
        }

        public RelayCommand SpeakCommand { get; private set; }

        public MainWindowViewModel()
        {
            SpeechList = new ObservableCollection<string>();

            _aiPlayer = new AIPlayer(this);
            AIPlayerObject = _aiPlayer.GetObject();

            SpeakCommand = new RelayCommand(Speak_Command);
        }

        public void onAIPlayerError(AIError error)
        {
            Application.Current.Dispatcher.BeginInvoke(DispatcherPriority.Render, new Action(() =>
            {
                SpeechList.Add(error.getMessage());
                AIStatusText = nameof(AIError);
            }));
        }

        public void onAIPlayerResLoadingProgressed(int current, int total)
        {
            Application.Current.Dispatcher.BeginInvoke(DispatcherPriority.Render, new Action(() =>
            {
                float progress = ((float)current / (float)total) * 100;
                AIStatusText = string.Format("AI Resource Loading... {0}%", (int)progress);
            }));
        }

        public void onAIStateChanged(AIState state)
        {
            switch (state.state)
            {
                case AIState.RES_LOAD_COMPLETED:
                    Application.Current.Dispatcher.BeginInvoke(DispatcherPriority.Render, new Action(() =>
                    {
                        AIStatusText = "AI Resource loading completed.";
                    }));
                    break;
            }
        }

        private void Speak_Command(object args)
        {
            if (string.IsNullOrEmpty(InputText) == false)
            {
                _aiPlayer.Send(new[] { InputText });
                SpeechList.Add(InputText);
                InputText = string.Empty;
            }
        }
    }
}
```

- MainWindow.xaml

```xml
<Window x:Class="WpfApp1.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:WpfApp1"
        d:DataContext="{d:DesignInstance Type=local:MainWindowViewModel}"
        mc:Ignorable="d"
        Title="MainWindow" Height="450" Width="800">
    <Grid>
        <Grid.ColumnDefinitions>
            <ColumnDefinition/>
            <ColumnDefinition/>
        </Grid.ColumnDefinitions>

        <ContentControl Margin="0" Grid.Column="0" Content="{Binding Path=AIPlayerObject}" Focusable="False" />

        <Grid Margin="0" Grid.Column="1">
            <Grid.RowDefinitions>
                <RowDefinition Height="1*"/>
                <RowDefinition Height="10*"/>
                <RowDefinition/>
            </Grid.RowDefinitions>

            <Grid Grid.Row="0">
                <Grid.Background>
                    <SolidColorBrush Color="#00D3D3"/>
                </Grid.Background>
                <Viewbox>
                    <TextBlock FontWeight="Bold">
                        <Label Content="{Binding AIStatusText}" />
                    </TextBlock>
                </Viewbox>
            </Grid>
            <Grid Grid.Row="1">
                <DockPanel>
                    <ScrollViewer VerticalScrollBarVisibility="Auto" HorizontalScrollBarVisibility="Auto">
                        <ItemsControl BorderThickness="0" ItemsSource="{Binding SpeechList}" Focusable="False" />
                    </ScrollViewer>
                </DockPanel>
            </Grid>
            <Grid Grid.Row="2">
                <Grid.ColumnDefinitions>
                    <ColumnDefinition Width="7*"/>
                    <ColumnDefinition/>
                </Grid.ColumnDefinitions>
                <TextBox Grid.Column="0" MaxLines="1" FontStretch="UltraExpanded" Text="{Binding InputText}">
                </TextBox>
                <Button Grid.Column="1" HorizontalAlignment="Stretch" Command="{Binding SpeakCommand}">
                    <TextBlock Padding="10, 5" Text="Send" />
                </Button>
            </Grid>
        </Grid>
    </Grid>
</Window>
```

- MainWindow.xaml.cs

```csharp
using System.Windows;

namespace WpfApp1
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            DataContext = new MainWindowViewModel();
        }
    }
}
```

:::info
There are many omitted parts in the above explanation. Please refer to App.xaml, QuickStartView.xaml, and QuickStartViewModel.cs files by opening the Solution file of the given Sample. 
:::

### 4. Command the AI to speak 

- Build Solution > Run > (Loading Resources) > Enter a sentence in the text box at the bottom right > Click the Send button

:::note
The actual AI Human may differ from the screenshot.
:::

  <img src="/img/aihuman/windows/Tutorial_danny_demo.png"  />


