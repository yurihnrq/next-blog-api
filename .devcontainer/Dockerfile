FROM fedora:latest

# Install needed packages.
RUN dnf update -y && \
  dnf install -y git wget zsh sudo && \
  dnf clean all

# Create a non-root - see https://aka.ms/vscode-remote/containers/non-root-user.
ARG USERNAME=dev
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Create the user with zsh as default shell.
RUN groupadd --gid $USER_GID $USERNAME \
  && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME -s /bin/zsh \
  && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
  && chmod 0440 /etc/sudoers.d/$USERNAME

# Set the default user.
USER $USERNAME

# Install oh-my-zsh, plugins and theme.
ARG ZSH_CUSTOM=/home/$USERNAME/.oh-my-zsh/custom
RUN sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" || true && \
  git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM}/plugins/zsh-autosuggestions && \
  git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM}/plugins/zsh-syntax-highlighting && \
  git clone https://github.com/spaceship-prompt/spaceship-prompt.git "$ZSH_CUSTOM/themes/spaceship-prompt" --depth=1 && \
  ln -s "$ZSH_CUSTOM/themes/spaceship-prompt/spaceship.zsh-theme" "$ZSH_CUSTOM/themes/spaceship.zsh-theme"

# Install NVM, Node and Yarn.
RUN wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash || true && \
  export NVM_DIR="$HOME/.nvm" && \
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && \
  nvm install --lts && \
  nvm use --lts && \
  npm i -g yarn


# Copy the .zshrc file and fix permissions.
# This file is copied to the container at build time.
# The copy need to be made after oh-my-zsh is installed.
# Root user is used to copy the file and give the correct permissions.
USER root
COPY .zshrc /home/$USERNAME/.zshrc
RUN chown $USER_UID:$USER_GID /home/$USERNAME/.zshrc

# Create a persistent history file (volume).
USER $USERNAME
ARG HISTORY_DIR=/home/${USERNAME}/.commandhistory
RUN mkdir ${HISTORY_DIR} && \
  touch ${HISTORY_DIR}/.zsh_history && \
  SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=${HISTORY_DIR}/.zsh_history" && \
  echo "$SNIPPET" >> "/home/$USERNAME/.zshrc"
