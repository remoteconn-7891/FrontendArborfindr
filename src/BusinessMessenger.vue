 <template>
    <div class="flex flex-col h-screen ">

      <div class="mx-2 h-full overflow-y-auto" id="message-cont">
        <p id="messages"  v-for="(msg, index) in messages" :key="index" :class="[`bg-gray-200 rounded-md w-fit px-4 py-2 m-2`, msg.isSent ? 'ml-auto' : '']"><b>{{ msg.username }}</b>: {{ msg.text }}</p>
      </div>

      <div class="m-2">
        <form @submit.prevent="SendMessage" class="flex items-center space-x-2">
          <input type="text" v-model="messageValue" id="input" name="input" class="border border-black rounded-md p-2 w-full" placeholder="type a message..." autocomplete="off">
          <button type="submit" class="bg-green-500 px-6 py-2 rounded-md">Send</button>
        </form>
      </div>

    </div>
  </template>