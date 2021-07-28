// const ClientError = require('../../exceptions/ClientError');

class PlaylistsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postPlaylistHandler = this.postPlaylistHandler.bind(this);
    this.getPlaylistsHandler = this.getPlaylistsHandler.bind(this);
    this.deletePlaylistByIdHandler = this.deletePlaylistByIdHandler.bind(this);
    this.postPlaylistSonghandler = this.postPlaylistSonghandler.bind(this);
    this.getPlaylistSongshandler = this.getPlaylistSongshandler.bind(this);
    this.deletePlaylistSongBySongIdHandler = this.deletePlaylistSongBySongIdHandler.bind(this);
  }

  async postPlaylistHandler(request, h) {
    // try {
      this._validator.validatePlaylistsPayload(request.payload);

      const { name } = request.payload;
      const { id: credentialId } = request.auth.credentials;

      const playlistId = await this._service.addPlaylist({ name, owner: credentialId, });

      const response = h.response({
        status: 'success',
        message: 'Playlist berhasil ditambahkan',
        data: {
          playlistId,
        },
      });
      response.code(201);
      return response;
    // } catch (error) {
    //   if (error instanceof ClientError) {
    //     const response = h.response({
    //       status: 'fail',
    //       message: error.message,
    //     });
    //     response.code(error.statusCode);
    //     return response;
    //   }

    //   // Server ERROR!
    //   const response = h.response({
    //     status: 'error',
    //     message: 'Maaf, terjadi kegagalan pada server kami.',
    //   });
    //   response.code(500);
    //   console.error(error);
    //   return response;
    // }
  }

  async getPlaylistsHandler(request, h) {
    // try {
      const { id: credentialId } = request.auth.credentials;
      const playlists = await this._service.getPlaylists(credentialId);
      return {
        status: 'success',
        data: {
          playlists,
        },
      };
    // } catch (error) {
    //   if (error instanceof ClientError) {
    //     const response = h.response({
    //       status: 'fail',
    //       message: error.message,
    //     });
    //     response.code(error.statusCode);
    //     return response;
    //   }
    //   // Server ERROR!
    //   const response = h.response({
    //     status: 'error',
    //     message: 'Maaf, terjadi kegagalan pada server kami.',
    //   });
    //   response.code(500);
    //   console.error(error);
    //   return response;
    // }
  }

  async deletePlaylistByIdHandler(request, h) {
    // try {
      const { playlistid } = request.params;
      const { id: credentialId } = request.auth.credentials;

      await this._service.verifyPlaylistOwner(playlistid, credentialId);
      await this._service.deletePlaylistById(playlistid);

      return {
        status: 'success',
        message: 'Playlist berhasil dihapus',
      };
    // } catch (error) {
    //   if (error instanceof ClientError) {
    //     const response = h.response({
    //       status: 'fail',
    //       message: error.message,
    //     });
    //     response.code(error.statusCode);
    //     return response;
    //   }

    //   // Server ERROR!
    //   const response = h.response({
    //     status: 'error',
    //     message: 'Maaf, terjadi kegagalan pada server kami.',
    //   });
    //   response.code(500);
    //   console.error(error);
    //   return response;
    // }
  }

  async postPlaylistSonghandler(request, h) {
    // try {
      this._validator.validatePostPlaylistSongsPayload(request.payload);

      const { playlistId } = request.params;
      const { songId } = request.payload;
      const { id: credentialId } = request.auth.credentials;

      await this._service.verifyAccess(playlistId, credentialId);
      await this._service.verifyPostID(songId);
      await this._service.addPostSongs({ playlistId, songId, });

      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan ke playlist',
      });

      response.code(201);
      return response;
    // } catch (error) {
    //   if (error instanceof ClientError) {
    //     const response = h.response({
    //       status: 'fail',
    //       message: error.message,
    //     });
    //     response.code(error.statusCode);
    //     return response;
    //   }

    //   // Server ERROR!
    //   const response = h.response({
    //     status: 'error',
    //     message: 'Maaf, terjadi kegagalan pada server kami.',
    //   });
    //   response.code(500);
    //   console.error(error);
    //   return response;
    // }
  }

  async getPlaylistSongshandler(request, h) {
    // try {
      const { playlistId } = request.params;
      const { id: credentialId } = request.auth.credentials;

      await this._service.verifyAccess(playlistId, credentialId);
      const songs = await this._service.getPlaylistSongs(credentialId);

      return {
        status: 'success',
        data: {
          songs,
        },
      };
    // } catch (error) {
    //   if (error instanceof ClientError) {
    //     const response = h.response({
    //       status: 'fail',
    //       message: error.message,
    //     });
    //     response.code(error.statusCode);
    //     return response;
    //   }
    //   // Server ERROR!
    //   const response = h.response({
    //     status: 'error',
    //     message: 'Maaf, terjadi kegagalan pada server kami.',
    //   });
    //   response.code(500);
    //   console.error(error);
    //   return response;
    // }
  }

  async deletePlaylistSongBySongIdHandler(request, h) {
    // try {
      const { playlistId } = request.params;
      const { songId } = request.payload;
      const { id: credentialId } = request.auth.credentials;

      await this._service.verifyAccess(playlistId, credentialId);
      await this._service.deletePlaylistSongById(playlistId, songId);

      return {
        status: 'success',
        message: 'Lagu berhasil dihapus dari playlist',
      };
    // } catch (error) {
    //   if (error instanceof ClientError) {
    //     const response = h.response({
    //       status: "fail",
    //       message: error.message,
    //     });
    //     response.code(error.statusCode);
    //     return response;
    //   }

    //   // Server ERROR!
    //   const response = h.response({
    //     status: 'error',
    //     message: 'Maaf, terjadi kegagalan pada server kami.',
    //   });
    //   response.code(500);
    //   console.error(error);
    //   return response;
    // }
  }
}

module.exports = PlaylistsHandler;
