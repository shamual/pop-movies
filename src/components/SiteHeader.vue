<template>
  <header class="header">
    <div class="modTitleWrapper">
      <slot name="goBackLink" class="goBackLink"></slot>
      <slot name="pageTitle" class="modTitle"></slot>
    </div>
    <div class="modMenuWrapper">
      <i class="fa fa-ellipsis-v" aria-hidden="true" v-on:click="menuClicked = !menuClicked"></i>
      <div class="sub-menu" v-bind:class="{menuActive:menuClicked}">
        <ul>
          <li>Top Rated Movies</li>
          <li>Favorite Movies</li>
          <li>Bookmarked Movies</li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'siteHeader',
  data () {
    return {
      msg: '',
      menuClicked : false
    }
  },
  methods:{

  }
 
}
</script>

<style scoped>
header{
  width: 100%;
  background-color: #212121;
  position: relative;
  display: block;
  float: left;
  clear: both;
  /*overflow: hidden;*/

}
.modTitleWrapper{
  text-align: left;
  padding: 0px 24px;
  margin: 0;
  float: left;
}
.modTitle{
  color:#fff;
  text-align: left;
  padding:0px;
  font-size: 24px;
  text-decoration: none;
  display: inline-block;
  vertical-align: bottom;
}
.goBackLink{
  text-decoration: none;
    /* font-size: 24px; */
    display: inline-block;
    color: #fff;
    font-size: 30px;
    padding: 13px 15px 13px 0px;
    vertical-align: middle;
}
.modMenuWrapper{
  float: right;
    clear: right;
    /*width: 10%;*/
    position: absolute;
    top: 15px;
    right: 0px;
    padding: 0px 24px;
}
.modMenuWrapper i{ 
    font-size: 30px;
    color:#fff;
}
.sub-menu{
  display: none;
  background-color: #f1f1f1;
  -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.5);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 999;
  right: 10px;
  width: 200px;

}
.menuActive{
  display: block;
}
.sub-menu ul{
    display: block;
    font-size: 0;
    padding: 0px;
    margin: 0;
    width: 100%;
}
.sub-menu ul li{
    display: block;
    font-size: 14px;
    list-style: none;
    /* margin: 10px auto; */
    padding: 10px 20px;
    line-height: 20px;
    text-align: left;
    font-weight: 700;
    color: #444;
}

</style>
