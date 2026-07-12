<script lang="ts">
  import { type IconProps } from "./types";

  const icons = import.meta.glob("../../assets/icons/*.svg", {
    eager: true,
    import: "default",
    query: "?raw",
  }) as Record<string, string>;

  let {
    className,
    color = "var(--color-primary)",
    maxSize = "32px",
    name,
    size = "100%",
    strokeColor = "var(--color-primary)",
    strokeWidth = "0px",
  }: IconProps = $props();

  const iconRaw = $derived(icons[`../../assets/icons/${name}.svg`]);
</script>

<div
  class="icon {className}"
  style="width: {size}; height: {size}; max-width: {maxSize}; max-height: {maxSize};"
  style:--icon-color={color}
  style:--stroke-color={strokeColor}
  style:--stroke-width={strokeWidth}
>
  {#if iconRaw}
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html iconRaw}
  {:else}
    <span color="red">{name} not found</span>
  {/if}
</div>

<style>
  .icon :global(svg) {
    width: 100%;
    height: 100%;
    fill: var(--icon-color);
    stroke: var(--stroke-color);
    stroke-width: var(--stroke-width);
  }
</style>
