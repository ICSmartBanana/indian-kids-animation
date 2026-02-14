import { Composition } from 'remotion';
import { DiwaliStory } from './Video';
import { STORY_CONFIG, SCENES } from './story-config';

// Calculate total duration
const titleDuration = 90; // 3 seconds
const endDuration = 120; // 4 seconds
const scenesDuration = SCENES.reduce((acc, scene) => acc + scene.duration, 0);
const totalDuration = titleDuration + scenesDuration + endDuration;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DiwaliStory"
        component={DiwaliStory}
        durationInFrames={totalDuration}
        fps={STORY_CONFIG.fps}
        width={1280}
        height={720}
        defaultProps={{}}
      />
    </>
  );
};
