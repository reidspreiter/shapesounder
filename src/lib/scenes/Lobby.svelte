<script lang="ts">
  import { Icon } from "../components";
  import { preferences } from "../state";

  const shapes = ["square", "circle", "star"] as const;

  type Shape = (typeof shapes)[number];
  let shapePressed = $state<Shape>("square");
  let audioDisabled = $state(false);
</script>

<div class="bar">
  <div class="bar-section" style="justify-content: left;">
    <p style="margin-left: 4px; font-size: 18px;">ShapeSounder</p>
  </div>
  <div class="bar-section" style="justify-content: center;">
    {#each shapes as shape, i (i)}
      <button
        class="bar-button"
        onclick={() => {
          shapePressed = shape;
        }}
      >
        <Icon name={shapePressed === shape ? shape : `${shape}-outline`} />
      </button>
    {/each}
  </div>
  <div class="bar-section" style="justify-content: right;">
    <button class="bar-button" onclick={() => (audioDisabled = !audioDisabled)}>
      <Icon name={audioDisabled ? "speaker-slash" : "speaker"} />
    </button>
    <button class="bar-button" onclick={() => (preferences.darkMode = !preferences.darkMode)}>
      <Icon name={preferences.darkMode ? "moon" : "sun"} />
    </button>
  </div>
</div>

<style>
  .bar {
    border-bottom: 2px solid var(--color-primary);
    display: flex;
    align-items: center;
    height: 40px;
  }

  .bar-section {
    display: flex;
    flex: 1;
    height: 100%;
    align-items: center;
  }

  .bar-button {
    border: none;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 4px;
    margin: 0;
    line-height: 0;
    height: 100%;
    display: inline-block;
  }

  .bar-button:hover {
    background-color: var(--color-hov);
  }
</style>
