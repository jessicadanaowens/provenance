class CreateTableItem < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :title
      t.text :description
      t.integer :purchase_price
      t.integer :estimated_value
      t.date :purchase_date
      t.timestamps
    end
  end
end
