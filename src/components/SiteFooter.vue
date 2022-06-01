<template>
  <footer>
    <span>A project by </span>
    <a href="http://travissmith.xyz">
      <span id="link">Travis Smith</span>
    </a>
  </footer>
</template>

<style lang="scss" scoped>
@import "@/scss/variables";

footer {
  @media ($mobile) {
    display: flex;
    place-content: center;
    gap: 4px;
    padding-bottom: 100px;
  }

  margin-top: 20px;
  color: $footer;
  font-size: 14px;

  a {
    text-decoration: none;
  }

  #link {
    color: inherit;

    &:hover {
      color: $green;
    }

    &:visited {
      text-decoration: none;
      color: inherit;
    }
  }
}
</style>
