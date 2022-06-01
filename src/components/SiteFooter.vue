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
  color: #a7bca3;
  font-size: 14px;

  a {
    text-decoration: none;
  }

  #link {
    color: #a7bca3;

    &:hover {
      color: #529d41;
    }

    &:visited {
      text-decoration: none;
      color: #a7bca3;
    }
  }
}
</style>
