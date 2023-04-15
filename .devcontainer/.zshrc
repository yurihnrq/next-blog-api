export ZSH="$HOME/.oh-my-zsh"

# Theme

ZSH_THEME="spaceship"

export SPACESHIP_BATTERY_SHOW=false
export SPACESHIP_USER_SHOW=always
export SPACESHIP_HOST_SHOW=always
export SPACESHIP_PROMPT_ADD_NEWLINE=false
export SPACESHIP_DIR_TRUNC=1
export SPACESHIP_PACKAGE_SHOW=false
export SPACESHIP_ASYNC_SHOW=false
export SPACESHIP_PROMPT_ASYNC=false

SPACESHIP_PROMPT_ORDER=(
  user           # Username section
  dir            # Current directory section
  host           # Hostname section
  git            # Git section (git_branch + git_status)
  docker         # Docker section
  docker_compose # Docker section
  exec_time      # Execution time
  line_sep       # Line break
  jobs           # Background jobs indicator
  exit_code      # Exit code section
  sudo           # Sudo indicator
  char           # Prompt character
)

# Plugins

plugins=(git zsh-syntax-highlighting zsh-autosuggestions)

source $ZSH/oh-my-zsh.sh

# User configuration

alias gacm="git add -A && git commit -am"
alias gaca="git add -A && git commit --amend"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# zsh history location
export HISTFILE=/commandhistory/.zsh_history
