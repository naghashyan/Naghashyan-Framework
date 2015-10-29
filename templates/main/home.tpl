<div class="welcome">
  <h1>nested home load</h1>
  {if isset($ns.demoDto)}
  <h2>Hello {$ns.demoDto->getName()}</h2>
  {/if}
</div>
