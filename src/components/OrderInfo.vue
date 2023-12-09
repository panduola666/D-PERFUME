<template>
  <div class="orderBg position-relative">
    <div class="container">
      <div class="row">
        <form class="col col-md-4 position-absolute top-50 needs-validation orderForm">
          <h3 class="mb-4 h2 text-secondary fw-semibold">記得<br />訂閱以獲取更多資訊！</h3>
          <div class="input-group">
            <div class="form-floating">
              <input
                type="email"
                class="form-control border-2 border-primary"
                id="floatingInput"
                placeholder="Your email address"
                required
              />
              <label for="floatingInput" class="text-secondary">Your email address</label>
            </div>
            <button class="input-group-text btn btn-primary px-5">Subscribe</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.orderBg {
  background: url('https://images.unsplash.com/photo-1532413992378-f169ac26fff0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjB8MTE1ODAyMTR8fGVufDB8fHx8fA%3D%3D')
    no-repeat center left/cover;
  height: 600px;
}
.orderForm{
  left: 0;
  @media (min-width: 768px) {
    left: auto;
  }
}
</style>
