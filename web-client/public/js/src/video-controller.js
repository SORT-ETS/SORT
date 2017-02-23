import VideoView from './video-view';

/**
* Video controller class
*/
export default class VideoController {
	constructor() {
		this.videoView = new VideoView('video');
	}
}
