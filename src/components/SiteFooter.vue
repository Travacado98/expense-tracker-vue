<template>
  <footer>
    <span>A project by </span>
    <a href="http://travissmith.xyz">Travis Smith</a>
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
    color: inherit;

    &:visited {
      text-decoration: none;
      color: inherit;
    }

    &:hover {
      color: $green;
    }
  }
}
</style>
