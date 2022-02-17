#! /bin/bash -e
#
# incluir no arquivo rc.local
# source ./pm2.sh

function _pm2 {

  [ -z $NVM_DIR ] && [ -s $HOME/.nvm/nvm.sh ] && \. $HOME/.nvm/nvm.sh

  echo $HOME

  [ -z $NVM_DIR ] && exit 0  
  
  [[ $1 =~ ^((re)?start|stop)$ ]] || exit 0

  # verifica se o pms está instalado
  local PM2=$(which pm2)
  [ -z $PM2 ] || [ ! -x $PM2 ] && exit 0

  # cancela todas instances pm2
  [ stop = $1 ] && $PM2 -s kill && exit 0

  # verifica diretorio local
  local APPS="$HOME/etc/pm2"
  [ -d $APPS ] || exit 0

  # iniciar pm2
  $PM2 -s ping

  for JSON in $(ls $APPS/*.json 2>&-); do

    local NAME=$(cut -d\" -f4 <<< $(grep name $JSON))
    local PID=$($PM2 pid $NAME)

    if [[ $1 = start && -z $PID ]]; then $PM2 $1 $JSON
    elif [ $1 = restart ]; then $PM2 $1 $NAME
    fi
  done
}

#[ -z $1 ] || _pm2 $1

#exit 0