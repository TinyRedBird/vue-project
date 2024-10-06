<template v-for="">
  <div class="OrderWarpper">
    <div class="OrderCardTopWarpper">
      <div class="OrderCardTop">
        <div>
          <input type="checkbox" name="" id="" />
        </div>
        <div class="OrderCardTopTextWarpper">
          <span class="OrderCardTopText">店铺：{{}}</span>
        </div>
      </div>
    </div>
    <!-- <div class="OrderLine"></div> -->
    <div class="Content-Count">
      <div>
        <div class="img-Count">
          <img
            src="https://cn.bing.com/images/search?view=detailV2&ccid=3r1vguZy&id=D66BA18EE154D133745ABEF43F0A4AE1418ADA84&thid=OIP.3r1vguZyWFUJ80A2Nf2k3AHaEK&mediaurl=https%3a%2f%2fimg-blog.csdnimg.cn%2f2021051521244130.jpg%3fx-oss-process%3dimage%2fwatermark%2ctype_ZmFuZ3poZW5naGVpdGk%2cshadow_10%2ctext_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl81MzQ0Nzc3Ng%3d%3d%2csize_16%2ccolor_FFFFFF%2ct_70&exph=1440&expw=2560&q=%e5%9b%be%e7%89%87&simid=608050649982581198&FORM=IRPRST&ck=86AD3FCD36463661C7CBA8A9759BE54B&selectedIndex=0&itb=0&idpp=overlayview&ajaxhist=0&ajaxserp=0"
            alt=""
          />
        </div>
        <div class="Detail-Scrip">
          <span>可口可乐</span>
        </div>
        <div class="Price-Count">
          <span>￥25.01</span>
        </div>
        <div></div>
        <div class="delete-Count"><button>删除</button></div>
      </div>
    </div>
  </div>
</template>

<script>
// import { useCartStore } from '@/stores/cartStore'
// const cartStore = useCartStore()
</script>

<style scoped>
.delete-Count button {
  height: 2rem;
}
.delete-Count {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  left: 24rem;
}
.Content-Count {
  padding: 10px 20px 10px 20px;
  width: 100%;
}
.Content-Count div {
  display: flex;
}
.Detail-Scrip {
  display: flex;
  position: relative;
  align-items: center;
  justify-self: start;
  left: 4rem;
}
.Price-Count {
  left: 8rem;
  display: flex;
  position: relative;
  align-items: center;
}
.OrderLine {
  position: absolute;
  width: 90%;
  height: 1px;
  top: 60px;
  margin: 0 auto;
  border-top: solid #bbb 1px;
}
.img-Count {
  width: 250px;
  height: 150px;
}
.img-Count img {
  width: 100%;
  height: 100%;
}
.OrderCardTop {
  display: flex;
  position: relative;
  top: 1rem;
  left: 1rem;
  /* right: 1rem; */
  flex-direction: row;
}

.OrderCardTopText {
  line-height: 25px;
  font-size: 20px;
}

.OrderCardTopTextWarpper {
  width: 200px;
  position: relative;
  font-size: 18px;
  left: 1rem;
  bottom: 0.3rem;
}

.OrderCardTopWarpper {
  height: 3rem;
  position: relative;
  /* left: 1rem; */
  /* top: 1rem; */
  border-radius: 20px 20px 0 0;
  border-bottom: 1px solid #bbb;
}

.OrderWarpper {
  background-color: #fff;
  border: 1px solid #bbb;
  border-radius: 20px;
  width: 900px;
  display: flex;
  flex-direction: column;
}
</style>
