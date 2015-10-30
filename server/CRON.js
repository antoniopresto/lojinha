SyncedCron.add({
  name: 'Limpa imagens não usadas',
  schedule: function(parser) {
    return parser.text('every 2 hours');
  },
  job: function() {
    //return Lojinha.limpaImagensSemUso && Lojinha.limpaImagensSemUso();
  }
});

//SyncedCron.start();
