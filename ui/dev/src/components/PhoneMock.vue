<template>
  <q-card class="phone-card">
    <q-card-section class="bg-white phone-head" >
    </q-card-section>

    <!--<q-separator />-->

    <q-card-section class="phone-preview">
      <div class="q-pa-md">
        <slot></slot>
      </div>
    </q-card-section>
    <!--<q-separator></q-separator>-->
    <q-card-section class="bg-white phone-footer" >
    </q-card-section>
  </q-card>
</template>

<style scoped>
  .phone-card {
    height: calc(100% - 80px);
    max-height: 650px;
    min-height: 400px;
    width: 320px;
    border-radius: 40px;
    display: flex;
    flex-direction: column;
  }
  .phone-head {
    position: relative;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 40px;
    border-bottom: 1px solid #c2c2c2;

  }
  .phone-head::before {
    content:'';
    border: 1px solid #c2c2c2;
    width: 6px;
    height: 6px;
    position: absolute;
    top: 50%;
    left: 35%;
    transform: translateX(-50%) translateY(-50%);
    border-radius: 4px;
  }
  .phone-head::after {
    content:'';
    background-color: #c2c2c2;
    width: 60px;
    height: 6px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    border-radius: 4px;
  }
  .phone-footer {
    position: relative;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 65px;
    border-top: 1px solid #c2c2c2;
  }
  .phone-footer::before {
    content:'';
    border: 1px solid #c2c2c2;
    width: 37px;
    height: 37px;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 40px;
    transform: translateX(-50%) translateY(-50%);
  }
  .phone-preview {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 100%;
    overflow: scroll;
  }
</style>

<script>
export default {
  name: 'PhoneMock'
}
</script>
