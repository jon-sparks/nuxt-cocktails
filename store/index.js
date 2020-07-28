import db from '../plugins/firebaseinit'

export const strict = false

export const state = () => ({
    cocktails: [],
    ingredients: []
})

export const mutations = {
    setCocktails: (state, val) => {
        state.cocktails = val
    },
    setIngredients: (state, val) => {
        state.ingredients = val
    }
}

export const actions = {
    
    fetchCocktails({ commit }) {
        let cocktails = []
        db.collection('Cocktails').onSnapshot(snapshot => {
            let changes = snapshot.docChanges()
            changes.forEach(change => {
                cocktails.push(change.doc.data())
            })
        })
        commit("setCocktails", cocktails);
    },
    fetchIngredients({ commit }) {
        let ingredients = []
        db.collection('Ingredients').onSnapshot(snapshot => {
            let changes = snapshot.docChanges()
            changes.forEach(change => {
                ingredients.push(change.doc.data())
            })
        })
        commit("setIngredients", ingredients);
    }
}
