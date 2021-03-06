import _ from 'lodash';

export const SoundCloudPlayerWrapperEvents = {
  PLAYING: 'playing',
  PAUSED: 'paused',
  FINISHED: 'finished',
  BUFFERED: 'buffered',
  SKIPED: 'skiped',
};

class SoundCloudPlayerWrapper {
  constructor(musicURI){
    this.id = musicURI;
    this.event = {}
    this.event[SoundCloudPlayerWrapperEvents.PLAYING] = new CustomEvent('playing',{
      musicID: this.id,
    });
    this.event[SoundCloudPlayerWrapperEvents.PAUSED] = new CustomEvent('paused',{
      musicID: this.id,
    });
    this.event[SoundCloudPlayerWrapperEvents.FINISHED] = new CustomEvent('finished',{
      musicID: this.id,
    });
    this.event[SoundCloudPlayerWrapperEvents.BUFFERED] = new CustomEvent('buffered',{
      musicID: this.id,
    });
  }

  play(){
    if(_.isUndefined(this.player)){
      SC.stream('tracks/' + this.id).then((player) => {
        // debugger;
        this.player = player;
        this.player.play().then(_=>{
          this.player.on('finish', _ => { 
            window.dispatchEvent(this.event[SoundCloudPlayerWrapperEvents.FINISHED]) 
          });
        });
        window.dispatchEvent(this.event[SoundCloudPlayerWrapperEvents.PLAYING]);
      
      });
    }
    else {
      this.player.play().then(_ => window.dispatchEvent(this.event[SoundCloudPlayerWrapperEvents.PLAYING]));
    }
  }
  
  pause(){
    this.player.pause();
  }

  isPaused(){
    if(this.player.getState() === 'paused'){
      return true
    }
    return false
  }

  skip(){
    this.player.kill();
  }

}


export default SoundCloudPlayerWrapper