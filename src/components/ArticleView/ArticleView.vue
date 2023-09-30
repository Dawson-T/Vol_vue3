<template>
  <div class="richTextView">
    <div class="viewContainer">
      <van-skeleton>
        <template #template>
          <div :style="{ display: 'flex', width: '100%' }">
            <div :style="{ flex: 1, marginLeft: '16px' }">
              <van-skeleton-paragraph row-width="80%" />
              <van-skeleton-paragraph row-width="30%" />
              <van-divider />
              <van-skeleton-paragraph
                :style="{ marginLeft: '10vw' }"
                row-width="88%"
              />
              <van-skeleton-paragraph />
              <van-skeleton-paragraph />
              <van-skeleton-paragraph />
              <van-skeleton-paragraph
                :style="{ marginLeft: '10vw' }"
                row-width="88%"
              />
              <van-skeleton-paragraph />
              <van-skeleton-paragraph />
              <van-skeleton-paragraph />
              <van-skeleton-image
                :style="{ margin: '2vh auto', height: '30%', width: '80%' }"
              />
              <van-skeleton-paragraph
                :style="{ marginLeft: '10vw' }"
                row-width="88%"
              />
              <van-skeleton-paragraph />
              <van-skeleton-paragraph />
              <van-skeleton-paragraph />
              <van-skeleton-paragraph
                :style="{ marginLeft: '10vw' }"
                row-width="88%"
              />
              <van-skeleton-paragraph />
              <van-skeleton-paragraph />
              <van-skeleton-paragraph />
            </div>
          </div>
        </template>
      </van-skeleton>
    </div>
  </div>
</template>

