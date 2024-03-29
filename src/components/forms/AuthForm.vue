<template>
  <section class="auth-form__container">
    <header class="auth-form__header">
      <span class="auth-form__header--title">
        {{ formMainText }}
      </span>
    </header>
    <div class="auth-form__body">
      <template v-if="isSignUp">
        <div class="field">
          <label class="label">Имя</label>
          <div class="control">
            <input
              class="input"
              v-model="form.firstName"
              type="text"
              placeholder="e.g. Alex"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Фамилия</label>
          <div class="control">
            <input
              class="input"
              v-model="form.lastName"
              type="text"
              placeholder="e.g. Alex"
            />
          </div>
        </div>
      </template>

      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input
            class="input"
            v-model="form.email"
            type="email"
            placeholder="e.g. alex@example.com"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Пароль</label>
        <div class="control">
          <input
            class="input"
            v-model="form.password"
            type="password"
            placeholder="********"
          />
        </div>
      </div>

      <div v-if="isSignUp" class="field">
        <label class="label">Повторите пароль</label>
        <div class="control">
          <input
            class="input"
            v-model="form.password"
            type="password"
            placeholder="********"
          />
        </div>
      </div>

      <template v-if="isSignUp">
        <div class="field">
          <label class="label">Телефон</label>
          <div class="control">
            <vue-tel-input @input="onPhoneInput" />
          </div>
        </div>
      </template>
    </div>
    <footer class="auth-form__footer">
      <div class="buttons">
        <button class="button is-link" :disabled="!canSubmit" @click="onSubmit">
          {{ formMainText }}
        </button>
      </div>
    </footer>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";

export default {
  name: "AuthForm",
  props: {
    isSignIn: {
      type: Boolean,
      default: false
    },
    isSignUp: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
        repeatPassword: "",
        firstName: "",
        lastName: "",
        phone: ""
      }
    };
  },
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
      },
      repeatPassword: {
        sameAsPassword: sameAs("password")
      },
      firstName: {
        required
      },
      lastName: {
        required
      }
    }
  },
  computed: {
    formMainText() {
      if (this.isSignIn) {
        return "Вход";
      }

      if (this.isSignUp) {
        return "Регистрация";
      }

      return "";
    },
    canSubmit() {
      if (this.isSignIn) {
        return this.canStartSignIn;
      }

      if (this.isSignUp) {
        return this.canStartSignUp;
      }

      return false;
    },
    canStartSignIn() {
      const isValidEmail = !this.$v.form.email.$invalid;
      const isValidPassword = !this.$v.form.password.$invalid;

      return isValidEmail && isValidPassword;
    },
    canStartSignUp() {
      const isValidFirstName = !this.$v.form.firstName.$invalid;
      const isValidLastName = !this.$v.form.lastName.$invalid;
      const isValidEmail = !this.$v.form.email.$invalid;
      const isValidPassword =
        !this.$v.form.password.$invalid &&
        !this.$v.form.repeatPassword.$invalid;

      return (
        isValidFirstName && isValidLastName && isValidEmail && isValidPassword
      );
    }
  },
  methods: {
    ...mapActions("userModule", ["login", "signUp"]),
    async onSubmit() {
      if (this.isSignIn) {
        const credentials = {
          email: this.form.email,
          password: this.form.password
        };

        try {
          await this.login(credentials);
          this.$modal.hide("auth-modal");
        } catch (error) {
          console.error(error);
        }
      }

      if (this.isSignUp) {
        const credentials = {
          email: this.form.email,
          password: this.form.password,
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          phone: this.form.phone
        };

        try {
          await this.signUp(credentials);
          this.$modal.hide("auth-modal");
        } catch (error) {
          console.error(error);
        }
      }
    },
    onPhoneInput(_, phoneObject) {
      if (phoneObject.valid) {
        this.form.phone = phoneObject.number;
      } else {
        this.form.phone = "";
      }
    }
  }
};
</script>

<style scoped lang="scss">
.auth-form__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px 20px;
  width: 100%;
  height: 100%;
}

.auth-form__header {
  color: black;
  text-align: center;
}

.auth-form__header--title {
  font-size: 1.5rem;
}

.auth-form__body {
  margin-bottom: 20px;
}

.auth-form__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
