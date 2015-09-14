"Navigating to directory..."
C:
cd C:\inetpub\wwwroot\HDSTeamBuilding\HDSMobileApp\ps_scripts

$title = "Run a script"
$message = "Which script would you like to run?"

$install_ps = New-Object System.Management.Automation.Host.ChoiceDescription "&1. Install Powershell v4.0"
$install_sw = New-Object System.Management.Automation.Host.ChoiceDescription "&2. Install Necessary Software"
$install_ws = New-Object System.Management.Automation.Host.ChoiceDescription "&3. Install Website"
$setup_reset_scenario = New-Object System.Management.Automation.Host.ChoiceDescription "&4. Setup or Reset Scenario"
$push_scenario = New-Object System.Management.Automation.Host.ChoiceDescription "&5. Push scenario to GitHub"
$nodejs = New-Object System.Management.Automation.Host.ChoiceDescription "&6. Run gulp with nodejs"

$options = [System.Management.Automation.Host.ChoiceDescription[]]($install_ps, $install_sw, $install_ws, $setup_reset_scenario, $push_scenario, $nodejs)


$scriptchoice = $host.ui.PromptForChoice($title, $message, $options, 0) 

switch ($scriptchoice) {
        0 {& "C:\inetpub\wwwroot\HDSTeamBuilding\HDSMobileApp\ps_scripts\Install-PSv4.0.ps1";}
        1 {& "C:\inetpub\wwwroot\HDSTeamBuilding\HDSMobileApp\ps_scripts\Install-Software.ps1";}
        2 {& "C:\inetpub\wwwroot\HDSTeamBuilding\HDSMobileApp\ps_scripts\Install-Website.ps1";}
        3 {& "C:\inetpub\wwwroot\HDSTeamBuilding\HDSMobileApp\ps_scripts\Setup-Reset-Scenario.ps1";}
        4 {& "C:\inetpub\wwwroot\HDSTeamBuilding\HDSMobileApp\ps_scripts\Push-Scenario.ps1";}
        5 {& "C:\inetpub\wwwroot\HDSTeamBuilding\HDSMobileApp\ps_scripts\nodejs.ps1";}
        default {"Please choose a script"}
    }